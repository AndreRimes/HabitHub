import Link from "next/link";
export default function LinkAuth({ isLogin }: { isLogin: boolean }) {
    return (
        <div className="w-2/3">
            {isLogin ? (
                <>
                    <h3 className="text-md text-gray-400">Do not have an Account?</h3>
                    <Link
                        href="/signup"
                        className="text-primary no-underline link transition-all duration-300 ease-out"
                    >Sign up&gt;</Link>
                </>
            ) : (
                <>
                    <h3 className="text-md text-gray-400">Already Have an Account?</h3>
                    <Link
                        href="/login"
                        className="text-primary no-underline link transition-all duration-300 ease-out"
                    >Log in&gt;</Link>
                </>
            )}
        </div>
    );
}
