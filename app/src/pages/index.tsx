import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import { Container, Box, Typography } from "@mui/material";
import UsersForm from "@/components/UsersForm";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <UsersForm />

      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>
      </Container>
    </>
  );
}
