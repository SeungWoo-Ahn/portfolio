import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../../api/supabase";
import type { User } from "../../types/User";

const Home = () => {
    const { data: users = [] } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const { data, error } = await supabaseClient
                .from('users')
                .select('*');
            if (error) throw error;
            return data;
        }
    });
    return (
        <>
            {users.map(user => (
                <div key={user.email}>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                </div>
            ))}
        </>
    );
};

export default Home;