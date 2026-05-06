import '../styles/footer.css'

export default function Footer(){
    return (
        <footer className="app-footer">
            © {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>
    );
}