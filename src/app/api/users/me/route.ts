import { getDataFromToken } from '@/helpers/getDataFromToken';

import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModal';
import { connect } from '@/dbConfig/dbConfig';

connect();


