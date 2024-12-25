


export const LoadingSimple = () => {



    return (
        <div className="relative  h-12">
            <div className="loading">
            </div>
        </div>

    )


}



export const LoadingFullPage = () => {


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50">
            <LoadingSimple />
        </div>

    )

}