import { Head, Link } from '@inertiajs/react';
import ProjectController from '@/actions/App/Http/Controllers/ProjectController';
import Heading from '@/components/heading';
import ProjectForm from '@/components/projects/project-form';
import type { ProjectFormValues } from '@/components/projects/project-form';
import { Button } from '@/components/ui/button';
import ProjectManagementLayout from '@/layouts/project-management-layout';

type Project = {
    id: number;
    portfolio: ProjectFormValues['portfolio'];
    title: string;
    description: string;
    tech_stack: string[];
    project_url: string | null;
    repository_url: string | null;
    image_url: string | null;
    completed_at: string | null;
    display_order: number;
    project_note: string | null;
};

export default function EditProject({ project }: { project: Project }) {
    return (
        <>
            <Head title={`Edit ${project.title}`} />
            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <Heading
                        title="Edit project"
                        description={`Update ${project.title}.`}
                    />
                    <Button variant="outline" asChild>
                        <Link href={ProjectController.index()}>
                            Back to projects
                        </Link>
                    </Button>
                </div>
                <div className="max-w-3xl rounded-xl border bg-card p-6">
                    <ProjectForm
                        projectId={project.id}
                        currentImage={project.image_url}
                        initialValues={{
                            portfolio: project.portfolio,
                            title: project.title,
                            description: project.description,
                            tech_stack: project.tech_stack.join(', '),
                            project_url: project.project_url ?? '',
                            repository_url: project.repository_url ?? '',
                            completed_at: project.completed_at ?? '',
                            display_order: String(project.display_order),
                            project_note: project.project_note ?? '',
                        }}
                    />
                </div>
            </div>
        </>
    );
}

EditProject.layout = ProjectManagementLayout;
