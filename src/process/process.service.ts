import { Injectable } from '@nestjs/common';
import { Process, ProcessReturn } from './process.interface';
import { DeleteProcessDto } from './dto/delete-process.dto';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

@Injectable()
export class ProcessService {
  private processes: Process[] = [];

  async create(): Promise<ProcessReturn> {
    const now = new Date();
    const newProcess: Process = {
      pid: uuidv4(),
      createdAt: format(now, 'hh:mm:ss a, MMMM yyyy'),
      updatedAt: format(now, 'hh:mm:ss a, MMMM yyyy'),
      logs: [format(now, 'hh:mm:ss a, MMMM yyyy')],
      timerId: null,
    };

    newProcess.timerId = setInterval(() => {
      const now = new Date();
      newProcess.logs.push(format(now, 'hh:mm:ss a, MMMM yyyy'));
      newProcess.updatedAt = format(now, 'hh:mm:ss a, MMMM yyyy');
    }, 5000);

    const processReturn: ProcessReturn = {
      pid: newProcess.pid,
      createdAt: newProcess.createdAt,
    };

    this.processes.push(newProcess);
    return processReturn;
  }

  async delete(deleteProcessDto: DeleteProcessDto): Promise<any> {
    console.log('pid --- ', deleteProcessDto.pid);
    const processIndex = this.processes.findIndex(
      (process) => process.pid === deleteProcessDto.pid,
    );
    if (processIndex !== -1) {
      console.log('pid ------- ', deleteProcessDto.pid);
      clearInterval(this.processes[processIndex].timerId);
      this.processes.splice(processIndex, 1);
      return {
        message: `Deleted process with PID: ${deleteProcessDto.pid.toString()}`,
      };
    }
  }

  async getAll(): Promise<ProcessReturn[]> {
    return this.processes.map((process) => {
      const processReturn: ProcessReturn = {
        pid: process.pid,
        createdAt: process.createdAt,
      };
      return processReturn;
    });
  }

  async getSingle(pid: string): Promise<any> {
    const process = this.filterProcess(
      this.processes.find((process) => process.pid === pid),
    );
    const processLog = process
      ? process.logs.map((log) => format(log, 'hh:mm:ss a, MMMM yyyy'))
      : [];

    return {
      Log: processLog,
    };
  }

  private filterProcess(process: Process): Omit<Process, 'timerId'> {
    const { timerId, ...filteredProcess } = process;
    return {
      ...filteredProcess,
      createdAt: format(filteredProcess.createdAt, 'hh:mm:ss a, MMMM yyyy'),
      updatedAt: format(filteredProcess.updatedAt, 'hh:mm:ss a, MMMM yyyy'),
      logs: filteredProcess.logs.map((log) =>
        format(log, 'hh:mm:ss a, MMMM yyyy'),
      ),
    };
  }
}
