import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import ProjectController from '@/actions/App/Http/Controllers/ProjectController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type ProjectFormValues = {
    portfolio: 'fabia' | 'ramos' | 'both';
    title: string;
    description: string;
    tech_stack: string;
    project_url: string;
    repository_url: string;
    image: File | null;
    completed_at: string;
    display_order: string;
    project_note: string;
};

type ProjectFormProps = {
    projectId?: number;
    initialValues?: Partial<ProjectFormValues>;
    currentImage?: string | null;
};

export default function ProjectForm({
    projectId,
    initialValues,
    currentImage,
}: ProjectFormProps) {
    const form = useForm<ProjectFormValues>({
        portfolio: initialValues?.portfolio ?? 'fabia',
        title: initialValues?.title ?? '',
        description: initialValues?.description ?? '',
        tech_stack: initialValues?.tech_stack ?? '',
        project_url: initialValues?.project_url ?? '',
        repository_url: initialValues?.repository_url ?? '',
        image: null,
        completed_at: initialValues?.completed_at ?? '',
        display_order: initialValues?.display_order ?? '0',
        project_note: initialValues?.project_note ?? '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (projectId) {
            form.post(ProjectController.update.form(projectId).action, {
                forceFormData: true,
            });

            return;
        }

        form.post(ProjectController.store.url(), {
            forceFormData: true,
        });
    }

    return (
        <form
            onSubmit={submit}
            className="space-y-6"
            encType="multipart/form-data"
        >
            <div className="grid gap-2">
                <Label htmlFor="portfolio">Show on portfolio</Label>
                <select
                    id="portfolio"
                    name="portfolio"
                    value={form.data.portfolio}
                    onChange={(event) =>
                        form.setData(
                            'portfolio',
                            event.target
                                .value as ProjectFormValues['portfolio'],
                        )
                    }
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs"
                    required
                >
                    <option value="fabia">Fabia</option>
                    <option value="ramos">Ramos</option>
                    <option value="both">Both portfolios</option>
                </select>
                <InputError message={form.errors.portfolio} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="title">Project title</Label>
                <Input
                    id="title"
                    name="title"
                    value={form.data.title}
                    onChange={(event) =>
                        form.setData('title', event.target.value)
                    }
                    maxLength={120}
                    required
                />
                <InputError message={form.errors.title} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                    id="description"
                    name="description"
                    value={form.data.description}
                    onChange={(event) =>
                        form.setData('description', event.target.value)
                    }
                    minLength={20}
                    maxLength={2000}
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    required
                />
                <InputError message={form.errors.description} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="tech_stack">Technologies</Label>
                <Input
                    id="tech_stack"
                    name="tech_stack"
                    value={form.data.tech_stack}
                    onChange={(event) =>
                        form.setData('tech_stack', event.target.value)
                    }
                    placeholder="React, Laravel, MySQL"
                    required
                />
                <p className="text-xs text-muted-foreground">
                    Separate each technology with a comma (up to 10).
                </p>
                <InputError message={form.errors.tech_stack} />
                {Object.entries(form.errors)
                    .filter(([key]) => key.startsWith('tech_stack.'))
                    .map(([key, message]) => (
                        <InputError key={key} message={message} />
                    ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="project_url">Project URL</Label>
                    <Input
                        id="project_url"
                        name="project_url"
                        type="url"
                        value={form.data.project_url}
                        onChange={(event) =>
                            form.setData('project_url', event.target.value)
                        }
                        placeholder="https://example.com"
                    />
                    <InputError message={form.errors.project_url} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="repository_url">Repository URL</Label>
                    <Input
                        id="repository_url"
                        name="repository_url"
                        type="url"
                        value={form.data.repository_url}
                        onChange={(event) =>
                            form.setData('repository_url', event.target.value)
                        }
                        placeholder="https://github.com/..."
                    />
                    <InputError message={form.errors.repository_url} />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="image">Project image</Label>
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(event) =>
                            form.setData(
                                'image',
                                event.target.files?.[0] ?? null,
                            )
                        }
                    />
                    <p className="text-xs text-muted-foreground">
                        JPG, PNG, or WebP; maximum 2 MB.
                    </p>
                    <InputError message={form.errors.image} />
                    {currentImage && (
                        <img
                            src={currentImage}
                            alt="Current project"
                            className="mt-2 h-24 w-40 rounded-md border object-cover"
                        />
                    )}
                </div>
                <div className="grid content-start gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="completed_at">Date completed</Label>
                        <Input
                            id="completed_at"
                            name="completed_at"
                            type="date"
                            value={form.data.completed_at}
                            onChange={(event) =>
                                form.setData('completed_at', event.target.value)
                            }
                        />
                        <InputError message={form.errors.completed_at} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="display_order">Display order</Label>
                        <Input
                            id="display_order"
                            name="display_order"
                            type="number"
                            min={0}
                            max={9999}
                            value={form.data.display_order}
                            onChange={(event) =>
                                form.setData(
                                    'display_order',
                                    event.target.value,
                                )
                            }
                            required
                        />
                        <InputError message={form.errors.display_order} />
                    </div>
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="project_note">Project Note</Label>
                <input
                    id="project_note"
                    name="project_note"
                    value={form.data.project_note}
                    onChange={(event) =>
                        form.setData('project_note', event.target.value)
                    }
                    maxLength={100}
                    placeholder="Optional"
                />
                <InputError message={form.errors.project_note} />
            </div>
            <div className="flex items-center gap-3">
                <Button type="submit" disabled={form.processing}>
                    {form.processing
                        ? 'Saving...'
                        : projectId
                          ? 'Update project'
                          : 'Create project'}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    disabled={form.processing}
                    onClick={() => window.history.back()}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
