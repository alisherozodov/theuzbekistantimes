import React, { useState } from 'react';
import { Plus, Folders, Trash2, Edit3, Check } from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import { Category } from '../../types/news';

export const CategoryManager: React.FC = () => {
  const { categories, saveCategory, deleteCategory } = useNews();

  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await saveCategory({
      id: editingCatId || undefined,
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      order: categories.length + 1
    });

    setName('');
    setSlug('');
    setDescription('');
    setEditingCatId(null);
  };

  const startEdit = (cat: Category) => {
    setEditingCatId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-4 border-b border-gray-800">
        <h1 className="font-brand text-2xl font-bold uppercase tracking-wider text-white">
          Category Desks Manager
        </h1>
        <p className="font-serif text-xs text-gray-400 mt-1">
          Define news topics, section names, and category descriptions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form to Add / Edit Category */}
        <div className="lg:col-span-5 bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
          <h2 className="font-brand font-bold text-sm uppercase text-white pb-2 border-b border-gray-800">
            {editingCatId ? 'Edit Category Desk' : 'Create New Category Desk'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!editingCatId) setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                }}
                placeholder="e.g. Artificial Intelligence"
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded text-xs text-white focus:outline-none focus:border-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="artificial-intelligence"
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded text-xs text-gray-300 font-mono focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Overview of stories published under this desk..."
                rows={3}
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded text-xs text-gray-300 font-serif focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{editingCatId ? 'Update Category' : 'Add Category'}</span>
              </button>

              {editingCatId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCatId(null);
                    setName('');
                    setSlug('');
                    setDescription('');
                  }}
                  className="px-3 py-2 bg-gray-800 text-gray-300 font-mono text-xs rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Categories List */}
        <div className="lg:col-span-7 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="p-4 bg-gray-950 border-b border-gray-800">
            <h3 className="font-brand font-bold text-xs uppercase tracking-wider text-white">
              Active Editorial Desks ({categories.length})
            </h3>
          </div>

          <div className="divide-y divide-gray-800/60 p-4 space-y-3">
            {categories.map((cat) => (
              <div key={cat.id} className="p-3 bg-gray-950/60 rounded-lg border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{cat.name}</span>
                    <span className="font-mono text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                      /{cat.slug}
                    </span>
                  </div>
                  <p className="font-serif text-xs text-gray-400 mt-1">{cat.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(cat)}
                    className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded"
                    title="Edit Category"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete category "${cat.name}"?`)) {
                        deleteCategory(cat.id);
                      }
                    }}
                    className="p-1.5 bg-gray-800 hover:bg-red-950 text-gray-400 hover:text-red-400 rounded"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
