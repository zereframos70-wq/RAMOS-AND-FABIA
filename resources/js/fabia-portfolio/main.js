const profilePhoto = '/fabia-portfolio-assets/profile-photo.jpg';

const technical = [
    ['HTML5', 'Markup'],
    ['CSS3', 'Styling'],
    ['JavaScript', 'Scripting'],
    ['Tailwind CSS', 'Utility CSS'],
    ['Flutter', 'Mobile Apps'],
    ['Dart', 'Language'],
    ['Firebase', 'Backend'],
    ['Git', 'Version Control'],
    ['GitHub', 'Collaboration'],
    ['Responsive Web Design', 'Layouts'],
    ['UI/UX Design', 'Interfaces'],
];
const soft = [
    'Communication',
    'Teamwork',
    'Problem Solving',
    'Time Management',
    'Adaptability',
    'Creativity',
    'Critical Thinking',
    'Willingness to Learn',
];
const timeline = [
    {
        label: 'College / Undergraduate',
        title: 'BS Information Technology',
        place: 'Urdaneta City University',
        date: 'Present',
        desc: 'Currently developing skills in programming, web and mobile development, database systems, user interface design, and information technology concepts.',
    },
    {
        label: 'Academic Seminar',
        title: 'Research Ethics Seminar',
        place: 'Urdaneta City University',
        date: 'Seminar',
        desc: 'Research ethics, informed consent, privacy, participant protection, and responsible handling of information.',
    },
    {
        label: 'Practical Activity',
        title: 'Responsive Interface Design Activity',
        place: 'Hands-On Laboratory Session',
        date: 'Hands-On Training',
        desc: 'Creating responsive interfaces for mobile, tablet, and desktop screen sizes.',
    },
    {
        label: 'Technical Training',
        title: 'Advanced Web Development',
        place: 'Academic Coursework & Self-Paced Exploration',
        date: 'Continuing',
        desc: 'Modern web development concepts and technologies.',
    },
];

export function initializeFabiaPortfolio(root) {
    const $ = (selector) => root.querySelector(selector);
    const controller = new AbortController();
    const { signal } = controller;
    const originalBodyOverflow = document.body.style.overflow;
    const makeElement = (tagName, className, text) => {
        const element = document.createElement(tagName);
        element.className = className;

        if (text) {
            element.textContent = text;
        }

        return element;
    };

    $('#heroImg').src = profilePhoto;
    $('#tech').innerHTML = technical
        .map(
            ([name, description]) =>
                `<div class="skill">${name}<small>${description}</small></div>`,
        )
        .join('');
    $('#soft').innerHTML = soft
        .map((name) => `<div class="skill">${name}</div>`)
        .join('');
    const projects = JSON.parse($('#projectGrid').dataset.projects || '[]');
    $('#projectGrid').replaceChildren(
        ...projects.map((project) => {
            const article = makeElement(
                'article',
                `card project${project.image_url ? ' project-with-image' : ''}`,
            );
            const thumbnail = makeElement('div', 'thumb');
            const content = makeElement('div', 'project-content p-4');
            const badge = makeElement(
                'span',
                'chip',
                `${project.portfolio === 'both' ? 'Shared' : project.portfolio} project`,
            );
            const title = makeElement(
                'h3',
                'project-title font-semibold mt-3 text-lg',
                project.title,
            );
            const description = makeElement(
                'p',
                'project-description text-xs text-slate-400 mt-2 leading-relaxed',
                project.description,
            );
            const note = project.project_note
                ? makeElement(
                      'p',
                      'project-note text-xs text-slate-400 mt-3 border-l border-violet-300/50 pl-3 italic',
                      `Note: ${project.project_note}`,
                  )
                : null;
            const tags = makeElement(
                'div',
                'project-tags flex flex-wrap gap-1.5 mt-3',
            );

            if (project.image_url) {
                const image = makeElement(
                    'img',
                    `project-preview-image${project.title === 'SafeDorm+' ? ' safe-dorm-image' : ''}`,
                );
                image.src = project.image_url;
                image.alt = `${project.title} preview`;
                thumbnail.append(image);
            }

            project.tech_stack.forEach((technology) => {
                tags.append(makeElement('span', 'tag', technology));
            });

            content.append(badge, title, description);

            if (note) {
                content.append(note);
            }

            content.append(tags);

            if (project.project_url || project.repository_url) {
                const link = makeElement(
                    'a',
                    'mt-4 inline-flex text-xs text-violet-300 hover:text-white',
                    project.project_url
                        ? 'View project ↗'
                        : 'View repository ↗',
                );
                link.href = project.project_url || project.repository_url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                content.append(link);
            }

            article.append(thumbnail, content);

            return article;
        }),
    );
    $('#timeline').innerHTML = timeline
        .map(
            (item) => `
  <li class="card">
    <div class="flex justify-between items-center gap-3 text-xs text-slate-400"><span class="text-violet-300 font-medium">${item.label}</span><span>${item.date}</span></div>
    <h3 class="font-semibold mt-2 text-lg">${item.title}</h3>
    <p class="text-xs text-emerald-400 mt-1">${item.place}</p>
    <p class="text-xs text-slate-400 mt-2 leading-relaxed">${item.desc}</p>
  </li>`,
        )
        .join('');

    const drawer = $('#mobileDrawer');
    const toggle = $('#toggle');
    const closeDrawer = $('#closeDrawer');
    const drawerBackdrop = $('#drawerBackdrop');
    const siteHeader = $('#siteHeader');
    const main = $('main');

    const setMenu = (open) => {
        drawer.classList.toggle('open', open);
        drawerBackdrop.classList.toggle('visible', open);
        drawer.setAttribute('aria-hidden', String(!open));
        drawer.toggleAttribute('inert', !open);
        siteHeader.toggleAttribute('inert', open);
        main.toggleAttribute('inert', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute(
            'aria-label',
            open ? 'Close navigation menu' : 'Open navigation menu',
        );
        document.body.style.overflow = open ? 'hidden' : originalBodyOverflow;

        if (open) {
            closeDrawer.focus();
        } else {
            const focusTarget = toggle.getClientRects().length
                ? toggle
                : $('#menu a');
            focusTarget.focus();
        }
    };

    toggle.addEventListener(
        'click',
        () => setMenu(!drawer.classList.contains('open')),
        { signal },
    );
    closeDrawer.addEventListener('click', () => setMenu(false), { signal });
    drawerBackdrop.addEventListener('click', () => setMenu(false), { signal });
    drawer.addEventListener(
        'click',
        (event) => {
            if (event.target.closest('a')) {
                setMenu(false);
            }
        },
        { signal },
    );
    document.addEventListener(
        'keydown',
        (event) => {
            if (!drawer.classList.contains('open')) {
                return;
            }

            if (event.key === 'Escape') {
                setMenu(false);

                return;
            }

            if (event.key === 'Tab') {
                const focusable = [
                    ...drawer.querySelectorAll(
                        'a[href], button:not([disabled])',
                    ),
                ];
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        },
        { signal },
    );
    const desktopMedia = window.matchMedia('(min-width: 768px)');
    desktopMedia.addEventListener(
        'change',
        (event) => {
            if (event.matches && drawer.classList.contains('open')) {
                setMenu(false);
            }
        },
        { signal },
    );

    const links = [...root.querySelectorAll('.nav-link')];
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    links.forEach((link) =>
                        link.classList.toggle(
                            'active',
                            link.hash === `#${entry.target.id}`,
                        ),
                    );
                }
            });
        },
        { rootMargin: '-45% 0px -50% 0px' },
    );
    root.querySelectorAll('main section').forEach((section) =>
        sectionObserver.observe(section),
    );

    const aboutSection = $('#about');
    const aboutRevealObserver = new IntersectionObserver(
        ([entry], revealObserver) => {
            if (entry.isIntersecting) {
                aboutSection.classList.add('is-visible');
                revealObserver.unobserve(aboutSection);
            }
        },
        { threshold: 0.12 },
    );
    aboutRevealObserver.observe(aboutSection);

    const copyEmailButton = $('#copyEmail');
    const copyEmailStatus = $('#copyEmailStatus');
    let copyEmailStatusTimeout;

    const showCopyEmailStatus = (message, isSuccess) => {
        copyEmailStatus.textContent = message;
        copyEmailStatus.classList.toggle('is-error', !isSuccess);
        copyEmailStatus.classList.add('is-visible');
        clearTimeout(copyEmailStatusTimeout);
        copyEmailStatusTimeout = setTimeout(() => {
            copyEmailStatus.classList.remove('is-visible');
        }, 2600);
    };

    const fallbackCopyText = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.append(textArea);
        textArea.select();

        try {
            return document.execCommand('copy');
        } finally {
            textArea.remove();
        }
    };

    copyEmailButton.addEventListener(
        'click',
        async () => {
            const email = 'kristine.fabia@ucu.edu.ph';

            try {
                if (navigator.clipboard?.writeText) {
                    await navigator.clipboard.writeText(email);
                } else if (!fallbackCopyText(email)) {
                    throw new Error('Clipboard copy is unavailable.');
                }

                showCopyEmailStatus('Email address copied!', true);
            } catch {
                showCopyEmailStatus(
                    'Could not copy. Please copy the email link.',
                    false,
                );
            }
        },
        { signal },
    );

    const form = $('#form');
    const status = $('#status');

    form.addEventListener(
        'submit',
        (event) => {
            event.preventDefault();
            const fields = [...form.querySelectorAll('[required]')];
            const invalidFields = fields.filter((field) => {
                const valid =
                    field.checkValidity() && field.value.trim().length > 0;
                field.setAttribute('aria-invalid', String(!valid));

                return !valid;
            });

            if (invalidFields.length) {
                status.textContent =
                    'Please fill in all required fields with a valid email address.';
                status.className = 'text-xs min-h-4 text-pink-400';
                invalidFields[0].focus();

                return;
            }

            status.textContent =
                'Thank you! Your details pass validation. This demo form is not connected to email yet.';
            status.className = 'text-xs min-h-4 text-emerald-400';
            form.reset();
            fields.forEach((field) => field.removeAttribute('aria-invalid'));
        },
        { signal },
    );
    form.addEventListener(
        'input',
        (event) => {
            const field = event.target;

            if (
                field.matches('[required]') &&
                field.checkValidity() &&
                field.value.trim()
            ) {
                field.removeAttribute('aria-invalid');
            }
        },
        { signal },
    );

    $('#year').textContent = new Date().getFullYear();

    return () => {
        controller.abort();
        sectionObserver.disconnect();
        aboutRevealObserver.disconnect();
        clearTimeout(copyEmailStatusTimeout);
        document.body.style.overflow = originalBodyOverflow;
        drawerBackdrop.classList.remove('visible');
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.setAttribute('inert', '');
        siteHeader.removeAttribute('inert');
        main.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
    };
}
