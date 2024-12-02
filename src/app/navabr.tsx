'use client'
import { useAuthContext } from "./auth/auth-context"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ShowCartButton } from "./shop/cart/show-cart-button"
import usePhosphorIcons from "./lib/phosphor"
import { ButtonWithIcon } from "./components/buttons/buttonsWithIcon"




const linksLeft = [
    { name: 'Home', path: '/' },
]

const Dropdowns = [
    {
        name: 'Admin',
        sublinks: [
            {
                name: 'All Products',
                link: '/admin/products'
            },
            {
                name: "Add Product",
                link: '/admin/products/create'
            }, {
                name: 'Product Categories',
                link: '/admin/product-categories'
            },

        ]

    },
    {
        name: 'User',
        sublinks: [
            {
                name: 'Profile',
                link: '/user/profile'
            }
        ]
    },
    {
        name: 'Shop',
        sublinks: [
            {
                name: 'shop',
                link: '/shop'
            },
            {
                name: 'All Products',
                link: '/shop/products/all'
            },
            {
                name: 'Product Categories',
                link: '/shop/categories'
            },
            {
                name: 'Search',
                link: '/shop/search'
            }
        ]
    }

]
const LoginAndSignup = <>
    <Link href="/auth/login">Login</Link>
    <Link href="/auth/signup">Signup</Link>
</>

const linksRight = [
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/auth/login' },
    { name: 'Signup', path: '/auth/signup' },
]

const protectedLinks = [
    { name: 'User', path: '/user/profile/' },
    { name: 'Admin', path: '/admin/' }
]






export const Navbar = () => {


    const { isAuthenticated, user } = useAuthContext()

    const isProtectedLink = ({ path, name }: { path: string, name: string }) => {
        let check1 = protectedLinks.some(link => path.includes(link.path))
        let check2 = protectedLinks.some(link => name.includes(link.name))
        if (check1 || check2) {
            return true
        }
    }

    const [showDropdown, setShowDropdown] = useState(false)

    const { ArrowDown } = usePhosphorIcons()


    const toggleDropdown = (e: React.MouseEvent) => {

        e.preventDefault()
        let target = e.target as HTMLElement
        let dropdown = target?.nextElementSibling as HTMLUListElement
        let allSublinks = document.querySelectorAll('.nav-sublinks')


        allSublinks.forEach(sublink => {
            if (sublink !== dropdown) {
                sublink.classList.add('hidden')
                setShowDropdown(false)
            }
        })
        dropdown?.classList.toggle('hidden')
        setShowDropdown(!showDropdown)
    }

    const checkClassName = (className: string, target: any) => {
        if (target?.classList.contains(className)) {
            return true
        }
        else {
            return false
        }

    }

    useEffect(() => {
        window.addEventListener('click', (e) => {
            let target = e.target as HTMLElement
            let nextSibling = target?.nextElementSibling as HTMLElement
            let children = nextSibling?.children


            if (checkClassName('nav-sublinks', target) || checkClassName('links', target)) {
                return
            }
            else if (checkClassName('nav-sublinks', nextSibling)) {
                return
            }
            if (children) {
                Array.from(children).forEach(child => {
                    if (checkClassName('nav-sublinks', child)) {
                        return
                    }
                })
            }




            let allSublinks = document.querySelectorAll('.nav-sublinks')
            allSublinks.forEach(sublink => {
                sublink.classList.add('hidden')
                setShowDropdown(false)
            })
        })

        return () => window.removeEventListener('click', () => { })




    }, [])





    return (
        <nav className="flex *:flex min-h-24 *:gap-4 justify-between items-start bg-transparent py-5">
            <ul>
                {linksLeft.map(link => {
                    if (!isAuthenticated && isProtectedLink({ path: link.path, name: link.name })) {
                        return null
                    }
                    else
                        return (
                            <li key={link.path} className="links">
                                <a href={link.path}>{link.name}</a>
                            </li>
                        )
                })}
            </ul>
            <ul className="flex  justify-around ">
                {Dropdowns.map((dropdown) => {

                    if (!isAuthenticated && isProtectedLink({ path: '', name: dropdown.name })) {
                        return null
                    }

                    return (
                        <li key={dropdown.name} className="relative links">
                            <ButtonWithIcon icon={<ArrowDown />} label={dropdown.name} rtl onClick={toggleDropdown} />
                            <ul className="hidden nav-sublinks absolute">

                                {dropdown.sublinks.map((sublink) => {

                                    return (
                                        <li key={sublink.link}>
                                            <Link href={sublink.link}>{sublink.name}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
            <ul>
                {linksRight.map(link => {
                    if (!isAuthenticated && isProtectedLink({ path: link.path, name: link.name })) {
                        return null
                    }
                    else
                        return (
                            <li key={link.path} className="links">
                                <Link href={link.path}>{link.name}</Link>
                            </li>
                        )
                })}
                <li className="links">
                    <ShowCartButton />
                </li>

            </ul>

        </nav>
    )


}