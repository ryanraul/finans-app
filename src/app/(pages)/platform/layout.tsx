import LayoutPlatformElement from "./layoutPlatformElement";

export default async function Plataform({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutPlatformElement>{children}</LayoutPlatformElement>;
}
