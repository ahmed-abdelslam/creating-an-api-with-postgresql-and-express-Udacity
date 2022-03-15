import Client from '../database';

export async function resetSequenceOfId(table_name: string): Promise<void> {
    try {
        const conn = await Client.connect();
        const sql = 'ALTER SEQUENCE '+ table_name +'_id_seq RESTART';
        const result = await conn.query(sql);

        conn.release();
    } catch (error) {
        throw new Error(`Could not reset sequence of id's in ${table_name}. Error: ${error}`)
    }
}