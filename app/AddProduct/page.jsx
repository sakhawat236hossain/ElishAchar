import AddProductForm from '@/components/Forms/AddProductForm';
import Link from 'next/link';

export default function AddProductPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
            {/* Header / Navbar */}
            <nav className="max-w-4xl mx-auto flex justify-between items-center mb-10 bg-slate-900/50 p-4 px-6 rounded-xl border border-slate-800 backdrop-blur-md">
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <Link href="/" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition">
                    ← হোম পেজে যান
                </Link>
            </nav>

            {/* Content Area */}
            <main className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">নতুন প্রোডাক্ট যুক্ত করুন</h2>
                    <p className="text-slate-400">আপনার শপে নতুন আইটেম যোগ করার জন্য নিচের ফর্মটি পূরণ করুন।</p>
                </div>
                <AddProductForm />
            </main>
        </div>
    );
};