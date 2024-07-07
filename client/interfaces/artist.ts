interface Avatar {
    url: string;
    color: string;

}
export default interface Artist {
    id: number;
    username?: string;
    display_name?: string;
    avatar: Avatar;
}