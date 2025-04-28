import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock function to fetch user data
const fetchUserById = (id: string) => {
    // This would be replaced with an actual API call
    return {
        id,
        name: "Alex Johnson",
        email: "alex@example.com",
        role: "Developer",
        status: "active" as const,
        joinDate: "2023-06-15",
        department: "Engineering",
        avatar: undefined, // Add an avatar URL here if available
    };
};

const UserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // In a real app, you would fetch this data from an API
    const user = fetchUserById(id || "");

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">User Details</h1>
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => navigate("/users")}>
                        Back to Users
                    </Button>
                    <Button onClick={() => navigate(`/users/${id}/edit`)}>
                        Edit User
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="info">Information</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl">{user.name}</CardTitle>
                                <CardDescription className="text-lg">{user.role}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                                    <p className="mt-1">{user.email}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Department</h3>
                                    <p className="mt-1">{user.department}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                    <p className="mt-1">
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                            }`}>
                                            {user.status}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Joined</h3>
                                    <p className="mt-1">{new Date(user.joinDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="activity" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>The user's recent activities and events</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Activity timeline would be displayed here...</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Settings</CardTitle>
                            <CardDescription>Manage user-specific settings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>User settings would be displayed here...</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default UserDetails;