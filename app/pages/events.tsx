import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'


type Res = {
    data: string
}

export const getServerSideProps = (async(context) => {
  const req = await fetch('https://localhost:3000/api/sheet');
  const res = await req.json();
  return {props: {res} }}) satisfies GetServerSideProps<{
    res: Res
}>

export default function Events({ res }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    res.data
  );
}