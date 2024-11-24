'use client'
import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import QRCode from "react-qr-code";

function Blackboard() {
    const [UVC, setUVC] = useState<any[]>([])
    useEffect(() => {
        const run = async () => {
            const res = await fetch('/api/blackboard')
            const data = await res.json()
            setUVC(data?.result)
        }
        run()
    }, [])
    return (
        <section className="md:grid grid-cols-12">
            <ul className="col-start-2 col-end-12">
                <h1 className="text-2xl font-bold text-primary text-center py-10 w-full">
                    Blackboard(UVC)
                </h1>
            </ul>
            <ul className="col-start-2 col-end-12 grid grid-cols-4 px-1 sm:grid-cols-7 lg:grid-cols-9 xl:grid-cols-12 gap-4">
                {
                    UVC?.map((r, index) => {
                        return (
                            <QrCodeGen key={index} r={r} />
                        )
                    })
                }
            </ul>
        </section>
    );
}

const QrCodeGen = ({ r }: { r: any }) => {
    const ref = useRef(null)
    const DownloadHandle = () => {
        const svgElement: any = ref.current;

        const canvas = document.createElement("canvas");
        const context: any = canvas.getContext("2d");
        const svgString = new XMLSerializer().serializeToString(svgElement);

        const image = new Image();
        image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);

        image.onload = () => {
            canvas.width = svgElement.clientWidth;
            canvas.height = svgElement.clientHeight;
            context.drawImage(image, 0, 0);

            const pngData = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngData;
            downloadLink.download = `${r?.UVC}.png`;
            downloadLink.click();
        };
    }
    return (
        <li>
            <QRCode
                ref={ref}
                size={100}
                style={{ height: "100px", maxWidth: "100px", width: "100px" }}
                value={r?.UVC}
                viewBox={`0 0 256 256`}
            />
            <p className="badge rounded-none badge-primary  w-full text-white">
                {
                    r?.UVC
                }
            </p>
            <button
                onClick={DownloadHandle}
                className="badge rounded-none w-full  badge-primary text-white">

                <FaDownload />

            </button>
        </li>
    )
}

export default Blackboard;