import * as React from "react";
import PieActiveArc from "@/components/PieActiveArc";
import { useUsers } from "../../context/UsersContext";

export default function ChartsPie() {
  const { users, graphql, edit } = useUsers();
  return (
    <PieActiveArc
      data={users.map((user: any, index: number) => ({
        id: index,
        value: user.participation,
        label: `${user.firstName} ${user.lastName}`,
      }))}
    />
  );
}
