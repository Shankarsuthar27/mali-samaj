import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Image as ImageIcon, Calendar, FolderOpen, X, CheckCircle, Upload, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAllBlogs, saveBlogPost, deleteBlogPost, BlogPost } from '../../lib/blogs';

export const AdminBlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('मारवाड़');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await fetchAllBlogs();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingBlog(null);
    setTitle('');
    setCategory('मारवाड़');
    setDesc('');
    setImageUrl('');
    setImagePreview('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setCategory(blog.category || 'मारवाड़');
    setDesc(blog.desc);
    setImageUrl(blog.image);
    setImagePreview(blog.image);
    setIsModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImageUrl(base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) {
      alert('कृपया ब्लॉग शीर्षक एवं विवरण दर्ज करें।');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveBlogPost({
        id: editingBlog ? editingBlog.id : undefined,
        title,
        category,
        desc,
        image: imageUrl || imagePreview || '/images/hero_community_banner.png',
        created_at: editingBlog ? editingBlog.created_at : undefined,
      });

      alert(editingBlog ? 'ब्लॉग सफलता पूर्वक अपडेट किया गया!' : 'नया ब्लॉग सफलता पूर्वक प्रकाशित किया गया!');
      setIsModalOpen(false);
      loadBlogs();
    } catch (err: any) {
      alert('Save Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number, blogTitle: string) => {
    if (!confirm(`क्या आप निश्चित रूप से "${blogTitle}" ब्लॉग को हटाना (Delete) चाहते हैं?`)) {
      return;
    }

    try {
      await deleteBlogPost(id);
      setBlogs((prev) => prev.filter((b) => String(b.id) !== String(id)));
      alert('ब्लॉग सफलता पूर्वक हटा दिया गया है।');
    } catch (err: any) {
      alert('Delete Error: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 font-devanagari">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">ब्लॉग एवं लेख प्रबंधन (Blog Management)</h2>
          <p className="text-xs text-slate-400">समाज ब्लॉग पोस्ट बनाएं, संपादित करें अथवा हटाएं</p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>नया ब्लॉग जोड़ें (Add Blog)</span>
        </button>
      </div>

      {/* Blogs Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs">ब्लॉग लोड हो रहे हैं...</div>
        ) : blogs.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">कोई ब्लॉग पोस्ट उपलब्ध नहीं है</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-bold">
                  <th className="py-3 px-4">फोटो</th>
                  <th className="py-3 px-4">शीर्षक (Title)</th>
                  <th className="py-3 px-4">श्रेणी (Category)</th>
                  <th className="py-3 px-4">दिनांक & मेटा</th>
                  <th className="py-3 px-4 text-right">कार्रवाई (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4">
                      <div className="w-14 h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
                        <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white max-w-md">
                      <p className="line-clamp-2 leading-snug">{b.title}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold text-[11px]">
                        <FolderOpen className="w-3 h-3 mr-1" />
                        <span>{b.category || 'मारवाड़'}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{b.meta.split(' • ')[0]}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to="/about/blog"
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title="View on Site"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEditModal(b)}
                          className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white text-[11px] font-bold transition-colors flex items-center space-x-1"
                          title="Edit Blog"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(b.id, b.title)}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white text-[11px] font-bold transition-colors flex items-center space-x-1"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form for Create / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fadeIn">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h3 className="text-base font-extrabold text-white">
                {editingBlog ? 'ब्लॉग संपादित करें (Edit Blog)' : 'नया ब्लॉग जोड़ें (Add New Blog)'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  ब्लॉग शीर्षक (Title) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ब्लॉग का मुख्य शीर्षक लिखें..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  श्रेणी (Category)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
                >
                  <option value="मारवाड़">मारवाड़</option>
                  <option value="प्रवास प्रदेश">प्रवास प्रदेश</option>
                  <option value="समाज समाचार">Blog</option>
                </select>
              </div>

              {/* Photo Upload / Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  ब्लॉग फोटो (Featured Image)
                </label>
                <div className="space-y-3">
                  {imagePreview ? (
                    <div className="flex items-center space-x-4 p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <div className="w-20 h-14 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>फोटो चयनित है</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setImageUrl('');
                          setImagePreview('');
                        }}
                        className="text-xs font-bold text-rose-400 hover:text-rose-300 px-3 py-1 bg-rose-500/10 rounded-lg border border-rose-500/20"
                      >
                        हटाएं
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-6 bg-slate-950 border-2 border-dashed border-slate-800 hover:border-orange-500/50 rounded-xl cursor-pointer transition-colors">
                      <Upload className="w-6 h-6 text-slate-400 mb-2" />
                      <span className="text-xs font-bold text-slate-300">फोटो अपलोड करें (Click to Upload Photo)</span>
                      <span className="text-[11px] text-slate-500 mt-1">PNG, JPG, WEBP (Max 5MB)</span>
                      <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                    </label>
                  )}

                  {/* Fallback Image URL Input */}
                  <input
                    type="text"
                    placeholder="अथवा फोटो URL दर्ज करें (Optional Image URL)..."
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Description Content */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  ब्लॉग विवरण (Description Content) *
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="ब्लॉग का विस्तृत विवरण लिखें..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500 leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-800"
                >
                  रद्द करें (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'सहेजा जा रहा है...' : editingBlog ? 'अपडेट करें (Save Changes)' : 'प्रकाशित करें (Publish Blog)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
