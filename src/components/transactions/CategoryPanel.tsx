import { Search, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import { useCategory } from "../../hooks/useCategory";
import type { Category } from "../../types/types";
import { Card } from "../ui/Card";
import { Field, TextInput } from "../ui/Field";
import { Button } from "../ui/Button";
import { useAuth } from "../AuthContext";

type Values = Omit<Category, "id">;

// TODO: Add Delete category button in edit mode too

export const CategoryPanel = () => {
  const { user, isInitializing, apiFetch } = useAuth();
  const [query, setQuery] = useState<string>("");
  const { categories, loadingCategories } = useCategory();
  const [displayCategories, setDisplayCategories] = useState<Category[]>([]);
  const [cat, setCat] = useState<Values>({ name: "", desc: "" });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    if (loadingCategories || !categories) return;
    setDisplayCategories(categories);
  }, [categories, loadingCategories]);

  useEffect(() => {
    const newDisplayCat = categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query.toLowerCase()) ||
        cat.desc.toLowerCase().includes(query.toLowerCase()),
    );
    setDisplayCategories(newDisplayCat);
  }, [query]);

  const handleSubmit = async (cat: Values) => {
    if (!user || isInitializing) return;
    if (!editId) {
      // Add mode
      const payload = {
        name: cat.name,
        desc: cat.desc,
      };

      const res = await apiFetch("/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.msg);
        return;
      }
      console.log(data);
      const newCat: Category = {
        id: data.result.cat_id,
        name: data.result.cat_name,
        desc: data.result.cat_desc,
      };
      // (list) => [...list, newCat]
      console.log([...displayCategories, newCat]);
      setDisplayCategories((list) => [...list, newCat]);
    } else {
      // Edit Mode
      const payload = {
        cat_id: editId,
        name: cat.name,
        desc: cat.desc,
      };
      console.log(payload);

      const res = await apiFetch("/categories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data.msg);
        return;
      }

      console.log(data);
      const newCat: Category = {
        id: data.result.cat_id,
        name: data.result.cat_name,
        desc: data.result.cat_desc,
      };
      console.log(newCat);
      setDisplayCategories((list) =>
        list.map((t) => (t.id === editId ? newCat : t)),
      );
      setEditId("");
      setCat({ name: "", desc: "" });
    }
  };

  const handleDelete = async (cat_id: string) => {
    if(!cat_id) return;
    const res = await apiFetch("/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cat_id: cat_id })
    });

    const data = await res.json();
    if(!res.ok) {
      alert(data.msg);
      return;
    }
    setDisplayCategories(list => list.filter(cat => cat.id !== cat_id));
    setCat({ name: "", desc: "" });
    setEditId(null);
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex xl:flex-col md:flex-row md:justify-evenly xl:justify-start mt-5 gap-5">
        <div className="md:w-[40%] xl:w-full flex flex-col">
          <h1 className="text-lg font-semibold">Category Panel</h1>
          <label className="mt-5 hidden h-9 min-w-[180px] flex-1 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-muted md:flex">
            <Search size={14} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Category Name..."
              className="w-full h-10 bg-transparent text-xs text-ink outline-none placeholder:text-muted"
            />
          </label>
          <ul className="mt-5 min-h-50 flex flex-col gap-5">
            {displayCategories.map((cat, key) => (
              <li
                key={key}
                className="px-3 flex flex-row justify-between border-1 border-black/10 rounded-lg p-3"
              >
                <span className="text-sm">{cat.name}</span>
                <button
                  onClick={() => {
                    setEditId(cat.id);
                    setCat({ name: cat.name, desc: cat.desc });
                  }}
                >
                  <MoreVertical size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="flex flex-col md:w-[40%] xl:w-full gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(cat);
            setCat({ name: "", desc: "" });
          }}
        >
          <h1 className="text-lg font-semibold">Add Category</h1>
          <Field label="Name">
            <TextInput
              value={cat.name}
              onChange={(e) => setCat({ ...cat, name: e.target.value })}
            />
          </Field>
          <Field label="Description">
            <TextInput
              value={cat.desc}
              onChange={(e) => setCat({ ...cat, desc: e.target.value })}
            />
          </Field>

          <Button className="w-full" type="submit">
            {editId ? "Save Changes" : "Add Category"}
          </Button>
          {editId ? (
            <div className="flex flex-row gap-2">
              <Button
                className="w-full"
                variant="neutral"
                onClick={() => {
                  setEditId("");
                  setCat({ name: "", desc: "" });
                }}
              >
                Cancel Changes
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  handleDelete(editId);
                }}
              >
                Delete
              </Button>
            </div>
          ) : null}
        </form>
      </div>
    </Card>
  );
};
