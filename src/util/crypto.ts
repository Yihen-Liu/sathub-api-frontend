import crypto, {BinaryToTextEncoding} from "crypto";

export function sha256(input:string, encoding:BinaryToTextEncoding):string {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest(encoding);
}