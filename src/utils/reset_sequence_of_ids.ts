import Client from '../database';

export async function resetSequenceOfId(table_name: string): Promise<void> {
    const conn = await Client.connect();
    const sql = 'ALTER SEQUENCE '+ table_name +'_id_seq RESTART';
    const result = await conn.query(sql);

    conn.release();
}