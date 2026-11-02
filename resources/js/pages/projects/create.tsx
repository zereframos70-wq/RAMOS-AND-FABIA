import { Head, Link } from '@inertiajs/react';
import ProjectController from '@/actions/App/Http/Controllers/ProjectController';
import Heading from '@/components/heading';
import ProjectForm from '@/components/projects/project-form';
import { Button } from '@/components/ui/button';
import ProjectManagementLayout from '@/layouts/project-management-layout';

export default function CreateProject() {
    return (
        <>
            <Head title="Create project" />
            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <Heading
                        title="Create project"
                        description="Add a project to one or both public portfolios."
                    />
                    <Button variant="outline" asChild>
                        <Link href={ProjectController.index()}>
                            Back to projects
                        </Link>
                    </Button>
                </div>
                <div className="max-w-3xl rounded-xl border bg-card p-6">
                    <ProjectForm />
                </div>
            </div>
        </>
    );
}

CreateProject.layout = ProjectManagementLayout;
