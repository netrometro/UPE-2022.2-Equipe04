interface HomeProps {
  count: number;
}

export function Teste(props: HomeProps) {

  return (
    <>
    <div>
        <h3>Users: {props.count}</h3>
        <p>{props.count}</p>
    </div>
    </>
    
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/')
  const data = await response.json()
  
  return {
    props: {
      count: data.count,
    }
  }
}