export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
}

