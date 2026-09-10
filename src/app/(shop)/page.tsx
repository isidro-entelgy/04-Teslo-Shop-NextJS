export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';



interface Props {
  searchParams: {
    page?: string;
  }
}
// 1. Añade 'async' a la función del componente
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>; // 2. Tipado como Promesa (si usas TypeScript)
}) {

  // 3. Desenvuelve la promesa con await antes de leer las propiedades
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  console.log({ currentPage, totalPages });

  if (products.length === 0) {
    redirect('/');
  }


  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />


      <Pagination totalPages={totalPages} />

    </>
  );
}
