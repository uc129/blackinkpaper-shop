'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
interface ButtonWithLinkProps {
    buttonText: string;
    link: string;
}




export const ButtonWithLink = (props: ButtonWithLinkProps) => {

    const router = useRouter();
    return (
        <button className="bg-black text-white p-2 rounded-lg" onClick={(e) => { e.preventDefault(); router.push(props.link) }}>
            <Link href={props.link} rel="noopener noreferrer">
                {props.buttonText}
            </Link>
        </button>
    )

}