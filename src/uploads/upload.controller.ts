import { Post, UseInterceptors, UploadedFile, Controller, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { authguard } from 'src/auth/guards/auth.guard';

@Controller('upload')
export class UploadController {
@UseGuards(authguard)

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './upload-file', 
      filename: (req, file, cb) => {

        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    
      limits: {
      fileSize: 1024 * 1024 * 10, 
      files: 3, 
    },

  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return {
      url: `http://localhost:8000/upload-file/${file.filename}`,
       massage : "File uploaded successfully" 
    };
  }
}