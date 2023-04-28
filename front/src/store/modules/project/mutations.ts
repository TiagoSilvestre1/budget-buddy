export default {
    setProject(state: any, project: any) {
        state.project = project;
        localStorage.setItem('project', project);
    },
};