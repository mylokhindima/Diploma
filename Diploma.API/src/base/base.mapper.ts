import { BaseEntity } from "./base.entity";
import { Document } from "mongoose";
import { pick } from "lodash";

export function baseMapper<T>(base: Document): BaseEntity<T> {
    return new BaseEntity(pick(base, ['id', 'created_at', 'updated_at']));
}