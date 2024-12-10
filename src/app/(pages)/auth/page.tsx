import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type loginRequest = {
  usernam: string;
  password: string;
};

export default function AuthPage() {
  return (
    <main className="h-screen flex w-full">
      <div className="bg-primary-foreground w-full h-full flex p-16"></div>
      <section className="flex items-center justify-center bg-background h-full max-w-3xl w-full p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tighter">
              Login
            </CardTitle>
            <CardDescription>
              Use your username and password to sign-in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="username">Username:</Label>
              <Input id="username" placeholder="user01" />
            </div>
            <div className="mt-4">
              <Label htmlFor="password"> Password: </Label>
              <Input
                id="password"
                placeholder="your password"
                type="password"
              />
            </div>
            <Button className="mt-6 w-full">Submit</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
