

export class FieldMapper {
  static readonly Field = '`%s`';
  static readonly StringReplace = '%s';
  static readonly Fields = '(%s)';

  static fieldReplace(value): string {
    return FieldMapper.Field.replace(FieldMapper.StringReplace, value);
  }
}