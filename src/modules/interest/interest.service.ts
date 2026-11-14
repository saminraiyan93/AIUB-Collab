import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Interest } from "./entities/interest.entity";
import { Repository } from "typeorm";
import { CreateInterestDto, UpdateInterestDto } from "./dto/interest.dto";

@Injectable()
export class InterestService {
    constructor
        (@InjectRepository(Interest)
        private readonly interestRepository: Repository<Interest>,
        ) { }

    async getInterests() {

        try {
            const interests = await this.interestRepository.find();
            return interests;
        }
        catch (error) {
            throw error;
        }
    }

    async getInterestsById(id: string) {
        try {
            const interest = await this.interestRepository.findOne(
                { where: { interest_id: id } }
            );

            if (!interest) {
                throw new NotFoundException("Interest not found!");
            }

            return interest;
        } catch (error) {
            throw error;
        }
    }

    async createInterest(dto: CreateInterestDto) {
        try {
            const responce = await this.interestRepository.create(dto);
            return await this.interestRepository.save(responce);
        }
        catch (error) {
            throw error;
        }
    }

    async updateInterest(id: string, dto: UpdateInterestDto) {
        try {
            console.log("id", id);
            if (!id) {
                throw new NotFoundException("Interest not found");
            }
            const interest = await this.interestRepository.findOne(
                {
                    where: {
                        interest_id: id,
                    },
                });
            if (!interest) {
                throw new NotFoundException("Interest not found");
            }
            Object.assign(interest, dto);
            const { interest_id, ...rest } = interest;
            return await this.interestRepository.update({ interest_id: id }, rest);
        } catch (error) {
            throw error;
        }
    }

    async deleteInterest(id: string) {
        try {
            const interest = await this.interestRepository.findOne({
                where: {
                    interest_id: id,
                },
            });
            if (!interest) {
                throw new NotFoundException("Interest not found");
            }
            return await this.interestRepository.delete({ interest_id: id });
        } catch (error) {
            throw error;
        }
    }
}