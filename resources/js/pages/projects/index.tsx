import { Head, Link, router, usePage } from '@inertiajs/react';
import ProjectController from '@/actions/App/Http/Controllers/ProjectController';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import ProjectManagementLayout from '@/layouts/project-management-layout';

type Project = {
    id: number;
    portfolio: 'fabia' | 'ramos' | 'both';
    title: string;
    description: string;
    tech_stack: string[];
    image_url: string | null;
    display_order: number;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    projects: {
        data: Project[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
    };
    flash: {
        success?: string;
    };
};

export default function ProjectsIndex() {
    const { projects, flash } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Manage projects" />
            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <Heading
                        title="Projects"
                        description="Manage the projects displayed on the Fabia and Ramos portfolios."
                    />
                    <Button asChild>
                        <Link href={ProjectController.create()}>
                            Add project
                        </Link>
                    </Button>
                </div>

                {flash.success && (
                    <p
                        role="status"
                        className="rounded-md border border-green-600/30 bg-green-600/10 px-4 py-3 text-sm text-green-700 dark:text-green-300"
                    >
                        {flash.success}
                    </p>
                )}

                {projects.data.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-10 text-center">
                        <p className="font-medium">No projects yet</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Create a project to show it on a portfolio.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl border">
                        <ul className="divide-y">
                            {projects.data.map((project) => (
                                <li
                                    key={project.id}
                                    className="flex flex-wrap items-center gap-4 p-4"
                                >
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt=""
                                            className="h-16 w-24 rounded-md border object-cover"
                                        />
                                    ) : (
                                        <div className="h-16 w-24 rounded-md bg-muted" />
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <h2 className="font-medium">
                                            {project.title}
                                        </h2>
                                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                            {project.description}
                                        </p>
                                        <p className="mt-1 text-xs capitalize">
                                            {project.portfolio} · Order{' '}
                                            {project.display_order}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={ProjectController.edit(
                                                    project.id,
                                                )}
                                            >
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            type="button"
                                            onClick={() => {
                                                if (
                                                    !window.confirm(
                                                        `Delete "${project.title}"? This cannot be undone.`,
                                                    )
                                                ) {
                                                    return;
                                                }

                                                router.delete(
                                                    ProjectController.destroy(
                                                        project.id,
                                                    ).url,
                                                );
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <nav aria-label="Pagination" className="flex flex-wrap gap-2">
                    {projects.links.map((link, index) =>
                        link.url ? (
                            <Link
                                key={`${link.label}-${index}`}
                                href={link.url}
                                preserveScroll
                                className={`rounded-md border px-3 py-2 text-sm ${link.active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                            >
                                {link.label
                                    .replace('&laquo;', '‹')
                                    .replace('&raquo;', '›')}
                            </Link>
                        ) : (
                            <span
                                key={`${link.label}-${index}`}
                                className="rounded-md border px-3 py-2 text-sm text-muted-foreground"
                            >
                                {link.label
                                    .replace('&laquo;', '‹')
                                    .replace('&raquo;', '›')}
                            </span>
                        ),
                    )}
                </nav>
            </div>
        </>
    );
}

ProjectsIndex.layout = ProjectManagementLayout;
