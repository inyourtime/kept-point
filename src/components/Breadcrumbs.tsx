import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";

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
              <Link to={path.href}>
                <BreadcrumbLink>{path.name}</BreadcrumbLink>
              </Link>
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
