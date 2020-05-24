import { PracticeEntity } from './practice.entity';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { CreateFileDTO } from '../+files/dto/create-file.dto';
import { FileEntity } from '../+files/file.entity';
import { FilesStore } from './../+files/files.store';
import { PracticesStore } from './practices.store';

const files: FileEntity[] = [];
const practices: PracticeEntity[] = [];


class FilesStoreStub {
    public async create(dto: CreateFileDTO): Promise<FileEntity> {
        const file = new FileEntity({
            id: files.length.toString(), 
            ...dto,
        });

        files.push(file);

        return file;
    }
}

class MockPracticeModel {
    public async findByIdAndUpdate(id: string, { file }: { file: string }) {
        const p = practices.find(p => p.id === id);
        p.fileId = file;
        return file;
    }
}

describe('PracticesStore', () => {
  let practicesStore: PracticesStore;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [
            PracticesStore,
            {
                provide: FilesStore,
                useClass: FilesStoreStub,
            },
            {
              provide: getModelToken('Practice'),
              useClass: MockPracticeModel,
            },
        ],
      }).compile();

    practicesStore = moduleRef.get<PracticesStore>(PracticesStore);
  });

  it('should be initialized', async () => {
    expect(practicesStore).toBeTruthy();
  });

  describe('upload', () => {
    beforeEach(() => {
      practicesStore.find = async (id: string) => {
        const p = practices.find(p => p.id === id);

        p.file = files.find(f => f.id === p.fileId);

        return p;
      }; 
    })

    it('should upload practice report', async () => {
      const practice = {
        id: '1',
        instructor: null,
        instructorId: '1',
        location: 'knure',
        student: null,
        studentId: '1',
      }

      practices.push(practice);

      const fileData = {  
        filename: 'testfile',
        originalname: 'originalname',
      };

      const result = await practicesStore.upload(practice.id, fileData);

      expect(result).toEqual({
          ...practice,
          fileId: '0',
          file: {
            id: '0',
            type: 0,
            name: fileData.originalname,
            path: fileData.filename,
          } 
      });
    });
  });
});