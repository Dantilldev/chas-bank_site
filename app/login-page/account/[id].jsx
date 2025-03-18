import {useRouter} from "next/router";
import {useState, useEffect} from "react";

export default function accountPage() {
  const router = useRouter();
  const {id} = router.query;

  const [user, setUser] = useState([]);

  async function getAccount() {
    const response = await fetch(`http://localhost:4000/accounts/${id}`);
    const data = await response.json();
    setItem(data);
  }

  useEffect(() => {
    getAccount();
  }, [id]);

  return <div></div>;
}
