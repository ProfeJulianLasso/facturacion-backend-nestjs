// Libraries
import { join } from 'path';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

// Exception Filters
import { QueryFailedErrorExceptionFilter } from '../../common/exception-filters';

// Modules
import { ClienteModule } from '../cliente/cliente.module';
import { BodegaModule } from '../bodega/bodega.module';
import { VentasModule } from '../ventas/ventas.module';

// Resolvers
import { HolaMundoResolver } from './ resolvers/hola-mundo/hola-mundo.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    BodegaModule,
    ClienteModule,
    VentasModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryFailedErrorExceptionFilter,
    },
    HolaMundoResolver,
  ],
})
export class MainModule {}
