import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from "path";
import { diskStorage } from "multer";
import { mkdirSync, existsSync } from "fs";
import { v4 as uuid } from 'uuid';
import path = require("path");



export const multerOptions = (dist, mimetypes: string[] = []) => ({
    // Enable file size limits
    // limits: {
    //     fileSize: +process.env.MAX_FILE_SIZE,
    // },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        const pattern = `\/(pdf|docx|doc|vnd.openxmlformats-officedocument.wordprocessingml.document${mimetypes.map(t => `|${t}`)})$`;

        if (file.mimetype.match(new RegExp(pattern))) {
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = path.resolve(process.cwd() + "/public/" + dist);
            // Create folder if doesn't exist
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath, {
                    recursive: true
                });
            }
            cb(null, uploadPath);
        },
        // File modification details
        filename: (req: any, file: any, cb: any) => {
            // Calling the callback passing the random name generated with the original extension name
            cb(null, `${uuid()}${extname(file.originalname)}`);
        },
    }),
});