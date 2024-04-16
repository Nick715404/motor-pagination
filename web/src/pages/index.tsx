import Head from "next/head";
import { Inter } from "next/font/google";
import Table from "react-bootstrap/Table";
import { Alert, Container } from "react-bootstrap";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { BootstrapPagination } from "@/components/Pagination";
import { count } from "console";

const inter = Inter({ subsets: ["latin"] });

type TUserItem = {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  updatedAt: string
}

type TGetServerSideProps = {
  statusCode: number
  users: TUserItem[]
  totalPages: number
  pageNum: number
}

export const getServerSideProps = (async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const { pageNum = 1, size = 20 } = ctx.query;
    const url = `http://localhost:3000/users/per-page?page=${pageNum}&size=${size}`;
    const res = await fetch(url, { method: 'GET' });

    if (!res.ok) {
      return { props: { statusCode: res.status, users: [], totalPages: 0, pageNum: 0 } }
    }

    const { users, totalCount } = await res.json();
    const totalPages = Math.ceil(totalCount / +size);

    return {
      props: { statusCode: 200, users: users, totalPages: totalPages, pageNum: +pageNum }
    }
  } catch (e) {
    return { props: { statusCode: 500, users: [], totalPages: 0, pageNum: 0 } }
  }
}) satisfies GetServerSideProps<TGetServerSideProps>


export default function Home({ statusCode, users, totalPages, pageNum }: TGetServerSideProps) {

  if (statusCode !== 200) {
    return <Alert variant={'danger'}>Ошибка {statusCode} при загрузке данных</Alert>
  }

  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inter.className}>
        <Container>
          <h1 className={'mb-5'}>Пользователи</h1>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Дата обновления</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.updatedAt}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

          <BootstrapPagination currentPage={pageNum} totalPages={totalPages} />

        </Container>
      </main>
    </>
  );
}
