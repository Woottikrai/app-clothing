import { useQueryClient } from "react-query";
import Container from "../../components/container";
import { useOrderHistory } from "../../services/auth/order/order";
import { useAuthContext } from "../../provider/auth/provider.auth";


export default function OrderList() {
    const { profile } = useAuthContext();
    const qClient = useQueryClient();
    const { data: orderhistory } = useOrderHistory(profile?.id);
    console.log(orderhistory)
    return (
        <Container>

        </Container>
    )
}