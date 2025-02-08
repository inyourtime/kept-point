import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps
  extends React.ComponentPropsWithoutRef<typeof Breadcrumb> {
  paths: { name: string; href?: string }[];
}

const Breadcrumbs = ({ paths, ...props }: BreadcrumbsProps) => {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <BreadcrumbItem key={index}>
            {path.href ? (
              <BreadcrumbLink href={path.href}>{path.name}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{path.name}</BreadcrumbPage>
            )}
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
