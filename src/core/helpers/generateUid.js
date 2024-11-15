export const generateUid = () => {
    return Date.now().toString(36)+ Math.random().toString(36).substring(2, 8);
}


export default generateUid;