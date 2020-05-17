import { push } from 'connected-react-router';

export const Navigate = url => push(url);

const Navigation = {
    home: '/',
    category: '/category',
    subCategory: '/sub-category',
};

export default Navigation;
