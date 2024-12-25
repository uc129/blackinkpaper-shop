



export default function AdminLayout(props: { children: React.ReactNode }) {
    return (
        <div className="flex">
            {/* <AdminSidebar /> */}
            <div className="flex-1">
                {/* <AdminHeader /> */}
                <div className="px-16 py-6">
                    {props.children}
                </div>
            </div>
        </div>
    );
}