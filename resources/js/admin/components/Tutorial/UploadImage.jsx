import React from "react";

export default function UploadImage() {
    return (
        <span>
            Silahkan pilih gambar yang ingin anda upload, kemudian klik tombol
            save untuk mulai meng upload gambar tersebut !
            <br />
            <h5 className="font-weight-bold mt-3">Tips</h5>
            <div className="container">
                <ul>
                    <li>
                        Pastikan gambar tersebut memiliki kualitas yang bagus
                        <br />
                        Usahakan memiliki resolusi lebih dari Full HD (1.920 x
                        1.080 piksel)
                    </li>
                    <li>
                        Jangan khawatir tentang performa, aplikasi ini akan
                        otomatis menyediakan gambar sesuai kebutuhan
                    </li>
                    <li>
                        Jika ingin upload gambar dari microsoft word / document editor lainnya,
                        supaya kualitas gambarnya jelas (bagus), Caranya
                        <ul>
                            <li>Pada aplikasi ms word, Klik kanan pada gambar yang di inginkan </li>
                            <li>Pilih save as picture</li>
                            <li>Silahkan upload ke admin panel ini dengan gambar yang sudah di save as tersebut</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </span>
    );
}
