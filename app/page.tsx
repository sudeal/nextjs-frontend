import Link from 'next/link';
import { Button, Card } from 'antd';

export default function Home() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-100'>
      <Card bordered={false} className='flex items-center justify-center bg-white/90 p-12 shadow-xl'>
        <Link href='/profile' className='inline-block'>
          <Button type='primary' size='large' className='h-14 rounded-full px-12 text-base font-semibold'>
            Profil Git
          </Button>
        </Link>
      </Card>
    </main>
  );
}
