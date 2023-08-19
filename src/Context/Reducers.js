export const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.token);
            return { ...state, user: action.user, token: action.token, auth: true, client: false }

        case 'PROFILE':
            localStorage.setItem('token', action.token);
            return { ...state, user: action.user, token: action.token, auth: true, client: false }

        case 'CLIENT':
            return { ...state, user: state.user, token: '', auth: false, client: true }

        case 'LOGOUT':
            localStorage.removeItem('token');
            window.location.pathname = '/'
            return { ...state, user: '', token: '', auth: false, client: true };
        default:
            window.location.pathname = '/'
            return { ...state, user: '', token: '', auth: false, client: true };
    }
}