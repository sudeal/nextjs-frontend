type FooterProps = {
  locale: string;
};

export async function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 text-center text-xs text-slate-500 sm:px-6 sm:py-4 sm:text-sm">
        © {year} Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
}

