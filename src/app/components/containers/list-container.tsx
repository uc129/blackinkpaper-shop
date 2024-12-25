



export const ListContainer = (props: { children: React.ReactNode }) => {


    return (
        <section className="container mx-auto w-[90%] py-12">
            {props.children}
        </section>
    )
}