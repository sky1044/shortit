import Head from "next/head";
import QRCodeList from "@/components/QRCodeList";
import Button from "@/components/Button";
import Link from "@/components/Link";
import styles from "@/styles/QRCodeListPage.module.css";
import dbConnect from "@/db/dbConnect";
import QRCode from "@/db/models/QRCode";
import axios from "@/lib/axios";
import { useState } from "react";

// Trigger redeploy

export async function getServerSideProps() {
  await dbConnect();
  const qrCodes = await QRCode.find();
  return {
    props: {
      qrCodes: JSON.parse(JSON.stringify(qrCodes)),
    },
  };
}

export default function QRCodeListPage({ qrCodes: initialQRCodes }) {
  const [qrCodes, setQRCodes] = useState(initialQRCodes);

  async function handleDelete(id) {
    await axios.delete(`/qrcodes/${id}`);
    setQRCodes((prevQRCodes) =>
      prevQRCodes.filter((qrCode) => qrCode._id !== id)
    );
  }

  return (
    <>
      <Head>
        <title>QRCode 만들기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>QRCode 만들기</h1>
          <Button as={Link} href="/qrcodes/new">
            새로 만들기
          </Button>
        </header>
        <QRCodeList items={qrCodes} onDelete={handleDelete} />
      </div>
    </>
  );
}
